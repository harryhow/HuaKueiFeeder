# HuaKueiFeeder

[Working in Progress]
This is a web app to record the feeding history for stray cat. 

### Notes
* 0904 - Architecture, quick working code with help by ChatGPT  
  1. User functions and page - feeding time, food type
  2. Managing functions and page - cat's photo, location description (id), switching to different cat
  3. Hook up with Firebase realtime database
  4. Test with Netlify using microservice functions
  5. Put serviceAccountKey.json to public git is not a good idea, need to move to .env setting. 

* 0904 - Fix Firebase api access issue by help with adding Netlify's console log, but still got error 500 when posting to '/.netlify/functions/recordFeeding', possible issues caused by 
  1. Function may have some error
  2. Incorrect permission for the file
  3. Problem with Netlify config
  4. Proble with Firebase config <--- maybe is this one?
  


