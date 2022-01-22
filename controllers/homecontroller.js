const User=require("../models/user")
const bcrypt=require("bcrypt")


module.exports.home=(req,res)=>{
    return res.render('home',{title:"Home || Upload X"}) 
}
module.exports.signin=(req,res)=>{
    return res.render('signin',{title:"Sign-in || Upload X"})
}

exports.signup=(req,res)=>{
    return res.render('signup',{title:"Signup || Upload X"})
}
exports.create =function(req, res){
    console.log(req.body)
 
    try{
      if(req.body.password!=req.body.confirm_password){
        req.flash('error', 'Passwords do not match');
        return res.redirect('back');
      }
      else{
          
        const newUser = new User({
            name:req.body.name,
            email: req.body.email,
            password:req.body.password,
          });
          bcrypt.genSalt(10,(err,salt)=>{
             bcrypt.hash(newUser.password,salt,(err,hash)=>{
                 if(err) throw err
                 newUser.password=hash
                 newUser.save().then(user=>{
                     req.flash('success',"Registered")
                     res.redirect('sign-in')
                 })
             })
          })
    
         
      }
      }
      catch(err){
          
      console.log("error")
  }
      
    
}
    

// Sign-in Functionality
exports.createSession =  function(req, res){
    console.log(req.body)
    req.flash('success', 'Logged in Successfully');
    return res.redirect('/');
   
}
// Sign-out
exports.signout=(req,res)=>{
    req.logout()
    req.flash("success","You are Logged Out")
    res.redirect("/")
}
// Profile 
exports.profile=(req,res)=>{
    req.flash('success','welcome')
    return res.render('profile',{title:"Profile || Upload X"})
}


exports.update=async (req,res)=>{

    try{
        if(req.user.id == req.params.id){
            let user= await  User.findById(req.params.id); 
            User.uploadedAvatar(req,res,(err)=>{
                if(err){
                    console.log("Multer errror",err)
                }
                console.log(req.file)
                // user.name=req.body.name;  
                // user.email=req.body.email;
                if(req.file){
                    if(user.avatar)
                    {
                       // fs.unlinkSync(path.join(__dirname,'..',user.avatar));
                       user.avatar=User.avatarPath+ '/' +req.file.filename;
                    }
                    //  fs.unlinkSync(path.join(__dirname,'..',user.avatar));
                  
                }
              
                
                user.save()
                return res.redirect('back');
            })
            
        }else{
            req.flash('error', 'Unauthorized!');
            return res.status(401).send('Unauthorized');
        }
    }catch(err){
        req.flash ('error',err)
        return res.redirect('back')
    }
}

module.exports.update1 =async function(req, res){
    
    
    if(req.user.id == req.params.id){
        try{
            let user= await  User.findById(req.params.id); 
            User.uploadedAvatar(req,res,(err)=>{
                if(err){
                    console.log("Multer errror",err)
                }
                user.name=req.body.name;  
                user.email=req.body.email;
                if(req.file){
                    if(user.avatar)
                    {
                        fs.unlinkSync(path.join(__dirname,'..',user.avatar));
                    }
                    user.avatar=User.avatarPath+ '/' +req.file.filename;
                    
                }
                user.save()
                return res.redirect('back');
            })
            
            
        }catch(err){
            req.flash ('error',err)
            return res.redirect('back')
        }
        
        
        
    }else{
        req.flash('error', 'Unauthorized!');
        return res.status(401).send('Unauthorized');
    }
}
