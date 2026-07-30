const fs = require('fs');
const path = require('path');

const adminDir = path.join(__dirname, 'src', 'app', 'admin', '(protected)');

const dirsToUpdate = [
  'achievements', 'certifications', 'education', 'experience', 
  'resume-requests', 'roles', 'skills', 'socials', 'testimonials'
];

dirsToUpdate.forEach(dir => {
  const compName = dir.split('-').map(p => p.charAt(0).toUpperCase() + p.slice(1)).join('') + 'Client.tsx';
  const filePath = path.join(adminDir, dir, compName);
  
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf-8');
    
    // Update the main container
    content = content.replace(
      /className="glass-card p-6 flex justify-between items-center group"/g,
      'className="glass-card p-4 md:p-6 flex flex-col md:flex-row md:justify-between items-start md:items-center gap-4 group"'
    );
    
    // Update the action buttons to be visible on mobile (opacity-100 instead of opacity-0)
    // and align them to the right or take full width
    content = content.replace(
      /className="flex items-center space-x-3 opacity-0 group-hover:opacity-100 transition-opacity"/g,
      'className="flex items-center space-x-3 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity w-full md:w-auto justify-end md:justify-start pt-2 md:pt-0 border-t md:border-t-0 border-white/10"'
    );
    
    // Check if the modal also needs p-6 -> p-4 md:p-6 update
    content = content.replace(
      /<div className="glass-card w-full max-w-2xl max-h-\[90vh\] overflow-y-auto p-6">/g,
      '<div className="glass-card w-full max-w-2xl max-h-[90vh] overflow-y-auto p-4 md:p-6">'
    );

    fs.writeFileSync(filePath, content);
    console.log(`Updated ${filePath}`);
  }
});
