import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';

interface Project {
  name: string;
  url: string;
  waitForSelector?: string;
  delay?: number;
}

const projects: Project[] = [
  { 
    name: 'streck', 
    url: 'https://streck.in',
    waitForSelector: 'main',
    delay: 3000
  },
  { 
    name: 'resumai', 
    url: 'https://resumai-ai.vercel.app/',
    waitForSelector: 'main',
    delay: 2000
  },
  { 
    name: 'pitcheme', 
    url: 'https://pitcheme.netlify.app/',
    waitForSelector: 'main',
    delay: 2000
  },
  { 
    name: 'tunewave-dashboard', 
    url: 'https://dashboard.tunewavemedia.in',
    waitForSelector: 'main',
    delay: 2000
  },
  { 
    name: 'hammr-physio', 
    url: 'https://hammrphysio.com/',
    waitForSelector: 'main',
    delay: 2000
  },
  { 
    name: 'urban-world-consulting', 
    url: 'https://urbanworldco.in/',
    waitForSelector: 'main',
    delay: 2000
  },
  { 
    name: 'melo-works', 
    url: 'https://melo.works',
    waitForSelector: 'main',
    delay: 2000
  },
  { 
    name: 'smaaash-entertainment', 
    url: 'https://smaaash-entertainment.in/',
    waitForSelector: 'main',
    delay: 2000
  }
];

async function captureScreenshots() {
  console.log('🚀 Starting screenshot capture...');
  
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  
  const page = await browser.newPage();
  
  // Set viewport for consistent screenshots
  await page.setViewport({ 
    width: 1920, 
    height: 1080,
    deviceScaleFactor: 2 // Higher quality
  });
  
  // Create screenshots directory if it doesn't exist
  const screenshotsDir = path.join(process.cwd(), 'public', 'screenshots');
  if (!fs.existsSync(screenshotsDir)) {
    fs.mkdirSync(screenshotsDir, { recursive: true });
  }
  
  for (const project of projects) {
    try {
      console.log(`📸 Capturing ${project.name}...`);
      
      await page.goto(project.url, { 
        waitUntil: 'networkidle0',
        timeout: 30000 
      });
      
      // Wait for specific selector if provided
      if (project.waitForSelector) {
        try {
          await page.waitForSelector(project.waitForSelector, { timeout: 10000 });
        } catch (error) {
          console.warn(`⚠️ Selector ${project.waitForSelector} not found for ${project.name}`);
        }
      }
      
      // Additional delay for animations/loading
      if (project.delay) {
        await new Promise(resolve => setTimeout(resolve, project.delay));
      }
      
      // Capture full page screenshot
      const screenshot = await page.screenshot({
        fullPage: true,
        type: 'png',
        quality: 90
      });
      
      // Save screenshot
      const filename = `${project.name}-hero.png`;
      const filepath = path.join(screenshotsDir, filename);
      fs.writeFileSync(filepath, screenshot);
      
      console.log(`✅ Captured screenshot for ${project.name}`);
      
    } catch (error) {
      console.error(`❌ Failed to capture ${project.name}:`, error instanceof Error ? error.message : String(error));
    }
  }
  
  await browser.close();
  console.log('🎉 Screenshot capture completed!');
}

// Run the script
captureScreenshots().catch(console.error);
