const axios=require('axios')
module.exports.news=async(req,res)=>{
 
	var data='';
	var url='https://newsapi.org/v2/everything?q=India&apiKey='+'86584eae3c3b4f6e899af4d4be08ce4e';
var news =await axios.get(url).then((response)=>{
		console.log(response.status);
		data = response.data;
		return data;
	}).catch(err=>{
		console.log(err)
	})
	// console.log(news);
	res.render('index',{news:news.articles,title:"Home"});
}
