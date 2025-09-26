const fs = require('fs');
const path = require('path');
const glob = require('glob');

// Find all HTML files in the build output
const htmlFiles = glob.sync('out/**/*.html');
const buildHtmlFiles = glob.sync('.next/**/*.html');
const allHtmlFiles = [...htmlFiles, ...buildHtmlFiles];

console.log(`Found ${allHtmlFiles.length} HTML files to process`);

const scriptTag = '<script src="/dashboard-console-capture.js"></script>';

allHtmlFiles.forEach(filePath => {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Check if script is already injected
    if (!content.includes('dashboard-console-capture.js')) {
      // Inject before closing head tag or at the beginning of body
      if (content.includes('</head>')) {
        content = content.replace('</head>', `  ${scriptTag}\n</head>`);
      } else if (content.includes('<body')) {
        content = content.replace('<body', `${scriptTag}\n<body`);
      }
      
      fs.writeFileSync(filePath, content);
      console.log(`Injected console capture script into ${filePath}`);
    }
  } catch (error) {
    console.error(`Error processing ${filePath}:`, error.message);
  }
});

console.log('Console capture script injection completed');