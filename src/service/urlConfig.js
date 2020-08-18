
export const urlHandler = () => {
  let url;
  if(process.env.VUE_APP_MODE === "production"){
    url = 'http://lesson.chaojidaogou.com:80';
  }else {
    url = 'http://newlive.chaojidaogou.com:80';
  }
  return url;
};
