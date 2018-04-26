if (process.env.NODE_ENV === 'production'){
  require('./www/production.js')
}else{
  require('./www/development.js');
}