/* GET home page. */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var mydataSchema = new Schema({
        'name' : String,
        'mail' : String,
        'memo' : String
});
var MyData = mongoose.model('mydata', mydataSchema);


var db = mongoose.connect('mongodb://localhost/mydb');

exports.index = function(req, res){
//  res.render('index', { title: 'Express' });
//        MyData.find(function(err, docs) {
//                if (err){
//                        console.log(err);
//                }
//                res.render('index', {
//                        title : 'Express',
//                        msg : 'データの一覧リスト',
//                        datas : docs
//                });
//        });

//        MyData.where().sort({'mail':'asc'}).exec(function(err, docs) {
//                if (err) {
//                        console.log(err);
//                }
//                res.render('index', {
//                        title : 'Express',
//                        msg : 'データの一覧リスト',
//                        datas : docs
//                });
//        });
        console.log(req.params.page);
        var page = req.params.page < 1 ? 1 : req.params.page;
        if (!page) page = 1;
        var volume = 5; // ☆１ページ当たりの表示データ数
        MyData.where().sort({
                'name' : 'asc'
        }).skip((page - 1) * volume).limit(volume)
        .exec(function(err, docs) {
                if (err) {
                        console.log(err);
                }
                res.render('index', {
                        title : 'Express',
                        msg : page + 'ページ目のデータ',
                        page: page,
                        datas : docs
                });
        });

};

exports.index_post = function(req, res) {
        var name = req.body.name;
        var mail = req.body.mail;
        var memo = req.body.memo;


        var data = new MyData({
                'name' : name,
                'mail' : mail,
                'memo' : memo
        });
        data.save(function(err) {
                if (err){
                        console.log(err);
                }
                res.redirect('/');
        });
};

exports.edit = function(req, res) {
        var id = req.params.id;
        MyData.findOne({
                '_id' : id
        }, function(err, doc) {
                if (err) {
                        console.log(err);
                }
                res.render('edit', {
                        title : 'Express',
                        msg : 'データの更新',
                        data : doc
                });
        });
};

exports.update = function(req, res) {
        var id = req.body.id;
        var name = req.body.name;
        var mail = req.body.mail;
        var memo = req.body.memo;
        MyData.findOne({
                '_id' : id
        }, function(err, doc) {
                if (err) {
                        console.log(err);
                }
                doc.name = name;
                doc.mail = mail;
                doc.memo = memo;
                doc.save(function(err) {
                        if (err) {
                                console.log(err);
                        }
                        res.redirect('/');
                });
        });
};

exports.del = function(req, res) {
        var id = req.params.id;
        MyData.findOne({
                '_id' : id
        }, function(err, doc) {
                if (err) {
                        console.log(err);
                }
                res.render('delete', {
                        title : 'Express',
                        msg : 'データの削除',
                        data : doc
                });
        });
};


exports.remove = function(req, res) {
        var id = req.body.id;
        MyData.findOne({
                '_id' : id
        }, function(err, doc) {
                if (err) {
                        console.log(err);
                }
                doc.remove(function(err) {
                        if (err) {
                                console.log(err);
                        }
                        res.redirect('/');
                });
        });
};

exports.find = function(req, res) {
        res.render('find', {
                title : 'Express',
                msg : 'データの検索',
                find : 'テキストを入力...',
                datas : []
        });
};


exports.find_post = function(req, res) {
        var fstr = req.body.find;
//        MyData.where({
//                'name' : fstr
//        }).exec(function(err, result) {
//                res.render('find', {
//                        title : 'Express',
//                        msg : 'データの検索',
//                        find : fstr,
//                        datas : result
//                });
//        });

//        MyData.where('name').equals(fstr).exec(function(err, result) {
//                res.render('find', {
//                        title : 'Express',
//                        msg : 'データの検索',
//                        find : fstr,
//                        datas : result
//                });
//        });

//        var arr = fstr.split(",");
//        MyData.where('name').in(arr)
//                .exec(function(err, result) {
//                res.render('find', {
//                        title : 'Express',
//                        msg : 'データの検索',
//                        find : fstr,
//                        datas : result
//                });
//        });

        var fptrn = new RegExp(fstr);
        var fset = [{'name':fptrn},{'mail':fptrn}];
        MyData.where().or(fset)
                .exec(function(err, result) {
                res.render('find', {
                        title : 'Express',
                        msg : 'データの検索',
                        find : fstr,
                        datas : result
                });
        });

};

exports.index_page = function(req, res) {
        var page = req.params.page < 1 ? 1 : req.params.page;
        var volume = 5; // ☆１ページ当たりの表示データ数
        MyData.where().sort({
                'name' : 'asc'
        }).skip((page - 1) * volume).limit(volume)
        .exec(function(err, docs) {
                if (err) {
                        console.log(err);
                }
                res.render('index_page', {
                        title : 'Express',
                        msg : page + 'ページ目のデータ',
                        page: page,
                        datas : docs
                });
        });
};
