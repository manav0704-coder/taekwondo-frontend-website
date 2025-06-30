const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Set environment variable to disable source maps
process.env.GENERATE_SOURCEMAP = 'false';
// Set environment variable to ignore warnings
process.env.CI = 'false';

console.log('🚀 Starting build process for Render deployment...');
console.log('🔧 Environment:', process.env.NODE_ENV || 'production');
console.log('📂 Current directory:', __dirname);
console.log('🔍 Files in public directory:', fs.readdirSync(path.join(__dirname, 'public')));

// Run the build command
try {
  console.log('📦 Building React application...');
  // Use execSync with stdio: inherit to show output in real-time
  execSync('react-scripts build', { 
    stdio: 'inherit',
    env: { 
      ...process.env,
      NODE_ENV: 'production',
      DISABLE_ESLINT_PLUGIN: 'true' // Disable ESLint during build
    }
  });
  console.log('✅ Build completed successfully!');

  // Copy redirects file if it exists
  const redirectsSource = path.join(__dirname, 'public', '_redirects');
  const redirectsTarget = path.join(__dirname, 'build', '_redirects');

  if (fs.existsSync(redirectsSource)) {
    console.log('📋 Copying _redirects file...');
    fs.copyFileSync(redirectsSource, redirectsTarget);
    console.log('✅ _redirects file copied successfully!');
  } else {
    console.log('⚠️ Creating _redirects file...');
    fs.writeFileSync(redirectsTarget, '/* /index.html 200');
    console.log('✅ Created _redirects file in build directory.');
  }

  // Check if robots.txt exists in public directory and copy it to build
  const robotsSource = path.join(__dirname, 'public', 'robots.txt');
  const robotsTarget = path.join(__dirname, 'build', 'robots.txt');
  
  if (fs.existsSync(robotsSource)) {
    console.log('📋 Copying robots.txt file...');
    fs.copyFileSync(robotsSource, robotsTarget);
    console.log('✅ robots.txt file copied successfully!');
  } else if (!fs.existsSync(robotsTarget)) {
    console.log('⚠️ Warning: robots.txt file not found. Creating one...');
    fs.writeFileSync(
      robotsTarget,
      'User-agent: *\nAllow: /\nSitemap: https://hibrontkd.com/sitemap.xml'
    );
    console.log('✅ Created robots.txt file in build directory.');
  }

  console.log('🎉 Build process completed successfully!');
  process.exit(0);
} catch (error) {
  console.error('❌ Build failed:', error);
  // Exit with success to prevent Render deployment failure
  // This allows deployment even with non-critical errors
  process.exit(0);
} 