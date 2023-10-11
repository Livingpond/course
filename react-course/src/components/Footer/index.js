import "./index.css"



function Footer() {
    return (
        <div className="footer">
            asdasdasdasd
          <div>Copyright © {new Date().getFullYear()} by: 公众号-课程减减</div>
          <div
            className="beian"
            onClick={() => window.open("https://beian.miit.gov.cn/", "_blank")}
          >
            沪ICP备2021019937号-2
          </div>
        </div>
      );
}

export default Footer;