const fs = require('fs');
const path = require('path');
const glob = require('glob');

// Read the console capture script
const scriptPath = path.join(__dirname, '..', 'public', 'dashboard-console-capture.js');
const consoleScript = fs.readFileSync(scriptPath, 'utf8');

// Find all HTML files in dist directory
const distPath = path.join(__dirname, '..', 'dist');
const htmlFiles = glob.sync('**/*.html', { cwd: distPath });

console.log('Injecting console capture script into HTML files...');

htmlFiles.forEach(file => {
  const filePath = path.join(distPath, file);
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Check if script is already injected
  if (content.includes('console-capture-ready')) {
    console.log(`Script already present in ${file}, skipping...`);
    return;
  }
  
  // Inject script before closing head tag
  const scriptTag = `<script>${consoleScript}</script>`;
  
  if (content.includes('</head>')) {
    content = content.replace('</head>', `${scriptTag}\n</head>`);
  } else {
    // Fallback: inject after opening body tag
    content = content.replace('<body>', `<body>\n${scriptTag}`);
  }
  
  fs.writeFileSync(filePath, content);
  console.log(`Console capture script injected into ${file}`);
});

console.log('Console capture script injection complete!');