module.exports = {
  closeSession: (req, res) => {
    req.session.destroy();
    res.render('index.ejs', {});
  }
};
