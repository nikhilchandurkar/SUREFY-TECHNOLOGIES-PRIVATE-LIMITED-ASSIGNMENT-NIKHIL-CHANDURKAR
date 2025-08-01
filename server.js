
import dotenv from 'dotenv';
dotenv.config(
  { 
    path: '.env',
    debug: false ,
    quiet: true
 }
);

import app from './src/app.js';

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
