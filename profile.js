const puppeteer = require('puppeteer');
const fs = require('fs');

async function runProfile() {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  
  // Connect to the locally running prod/dev server
  await page.setViewport({ width: 1920, height: 1080 });
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle2' });

  console.log('Starting trace...');
  
  await page.tracing.start({ path: 'trace.json', screenshots: false, categories: [
    '-*', 
    'devtools.timeline', 
    'v8.execute', 
    'disabled-by-default-devtools.timeline',
    'disabled-by-default-devtools.timeline.frame',
    'toplevel',
    'blink.console',
    'blink.user_timing',
    'latencyInfo',
    'disabled-by-default-devtools.timeline.stack',
    'disabled-by-default-v8.cpu_profiler'
  ]});

  // Inject script to observe RAF and FPS
  await page.evaluate(() => {
    window.framesRendered = 0;
    window.longFrames = 0;
    let lastTime = performance.now();
    
    function measure(now) {
      const delta = now - lastTime;
      if (delta > 20) window.longFrames++; // Anything over 20ms is a dropped frame at 60fps (16.6ms budget)
      window.framesRendered++;
      lastTime = now;
      requestAnimationFrame(measure);
    }
    requestAnimationFrame(measure);
  });

  // Wait 1 second to settle
  await new Promise(r => setTimeout(r, 1000));

  // Reset counters before scrolling
  await page.evaluate(() => {
    window.framesRendered = 0;
    window.longFrames = 0;
  });

  const scrollDurationMs = 8000;
  console.log(`Scrolling continuously for ${scrollDurationMs}ms...`);
  
  await page.evaluate(async (duration) => {
    await new Promise((resolve) => {
      let totalHeight = 0;
      const distance = 60;
      const timer = setInterval(() => {
        window.scrollBy(0, distance);
        totalHeight += distance;
      }, 16); // Simulate rapid scroll wheel events roughly 60 times a sec
      
      setTimeout(() => {
        clearInterval(timer);
        resolve();
      }, duration);
    });
  }, scrollDurationMs);

  const fpsMetrics = await page.evaluate(() => {
    return {
      framesRendered: window.framesRendered,
      longFrames: window.longFrames
    };
  });

  await page.tracing.stop();
  await browser.close();

  console.log(`Frames Rendered: ${fpsMetrics.framesRendered}`);
  console.log(`Long Frames (>20ms): ${fpsMetrics.longFrames}`);
  
  // Basic analysis of trace.json
  const trace = JSON.parse(fs.readFileSync('trace.json', 'utf8'));
  const events = trace.traceEvents || trace;
  
  let scriptingTime = 0;
  let renderingTime = 0;
  let paintingTime = 0;
  let layoutCount = 0;

  events.forEach(e => {
    if (!e.dur) return; // Duration in microseconds
    const durMs = e.dur / 1000;
    
    if (e.name === 'EvaluateScript' || e.name === 'FunctionCall' || e.name === 'TimerFire' || e.name === 'EventDispatch' || e.name === 'MinorGC' || e.name === 'MajorGC') {
      scriptingTime += durMs;
    }
    if (e.name === 'UpdateLayerTree' || e.name === 'Layout' || e.name === 'UpdateLayoutTree') {
      renderingTime += durMs;
      if (e.name === 'Layout') layoutCount++;
    }
    if (e.name === 'Paint' || e.name === 'CompositeLayers') {
      paintingTime += durMs;
    }
  });

  console.log(`\n=== TRACE ANALYSIS (${scrollDurationMs/1000}s window) ===`);
  console.log(`Scripting Time: ${scriptingTime.toFixed(2)} ms`);
  console.log(`Rendering (Layout) Time: ${renderingTime.toFixed(2)} ms`);
  console.log(`Painting/Compositing Time: ${paintingTime.toFixed(2)} ms`);
  console.log(`Layout Events Triggered: ${layoutCount}`);
  
  const estimatedFps = fpsMetrics.framesRendered / (scrollDurationMs / 1000);
  console.log(`Approximate Average FPS: ${estimatedFps.toFixed(2)}`);
  
  // Approximate frame budget usage
  const totalFrames = fpsMetrics.framesRendered;
  if (totalFrames > 0) {
    console.log(`Average Scripting per frame: ${(scriptingTime / totalFrames).toFixed(2)} ms`);
    console.log(`Average Rendering per frame: ${(renderingTime / totalFrames).toFixed(2)} ms`);
    console.log(`Average Painting per frame: ${(paintingTime / totalFrames).toFixed(2)} ms`);
    console.log(`Total main-thread time per frame: ${((scriptingTime + renderingTime + paintingTime) / totalFrames).toFixed(2)} ms`);
  }
}

runProfile().catch(console.error);
