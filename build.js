const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Set environment variable to disable source maps
process.env.GENERATE_SOURCEMAP = 'false';

console.log('🚀 Starting build process...');
console.log('🔧 Environment:', process.env.NODE_ENV || 'development');

// Run the build command
try {
  console.log('📦 Building React application...');
  execSync('react-scripts build', { stdio: 'inherit' });
  console.log('✅ Build completed successfully!');

  // Copy redirects file if it exists
  const redirectsSource = path.join(__dirname, 'public', '_redirects');
  const redirectsTarget = path.join(__dirname, 'build', '_redirects');

  if (fs.existsSync(redirectsSource)) {
    console.log('📋 Copying _redirects file...');
    fs.copyFileSync(redirectsSource, redirectsTarget);
    console.log('✅ _redirects file copied successfully!');
  } else {
    console.log('⚠️ Warning: _redirects file not found in public directory. Creating one...');
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
} catch (error) {
  console.error('❌ Build failed:', error);
  process.exit(1);
} 