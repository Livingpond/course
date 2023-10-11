const fetch = require('node-fetch');
const xlsx = require("node-xlsx");
const fs = require("fs");


async function sleep(time) {
    return new Promise((resolve) => {
        setTimeout(() => resolve(), time);
    });
}
const courseList  = [];
async function fetchData() {
    let hasMore = true;
    let count = 1;
    const body = {
    category_id: "0",
    cursor: "0",
    sort: 10,
    limit: 20,
    coupon_id: "",
};

    while(hasMore){
    try{
        const res = await fetch("https://api.juejin.cn/booklet_api/v1/booklet/listbycategory?aid=2608&uuid=7288551129621169698&spider=0", {
            headers: {
              accept: "*/*",
              "accept-language": "zh-CN,zh;q=0.9",
              "content-type": "application/json",
              "sec-ch-ua": "\"Microsoft Edge\";v=\"117\", \"Not;A=Brand\";v=\"8\", \"Chromium\";v=\"117\"",
              "sec-ch-ua-mobile": "?0",
              "sec-ch-ua-platform": "\"macOS\"",
              "sec-fetch-dest": "empty",
              "sec-fetch-mode": "cors",
              "sec-fetch-site": "same-site",
              "x-secsdk-csrf-token": "0001000000017a6b7c8a01c1ff8c38346b5c587c7dbbb9e38d1a80393eb4968fb5e9ef5150a0178cf2bfee2e25ab",
              cookie: "csrf_session_id=4bd573f37fa5970662fff76d0bba1856; msToken=MUJuhNvh6gDbqTH0S84A2Vt-n3e_EH0A-UXbu8daPovD0TBGlHrLmuGa0-zI3O58X_3i4EdyrstgMvHVwx7rzqAxMoSWdw77IqWcdNkV9Ew2dFnRFpzppwf7QcIolEs=; _tea_utm_cache_2608=undefined; __tea_cookie_tokens_2608=%257B%2522web_id%2522%253A%25227288551129621169698%2522%252C%2522user_unique_id%2522%253A%25227288551129621169698%2522%252C%2522timestamp%2522%253A1696998065944%257D",
              Referer: "https://juejin.cn/",
              "Referrer-Policy": "strict-origin-when-cross-origin"
            },
            body: JSON.stringify(body),
            method: "POST"
          }).then(res => res.json());
          console.log("cursor:", body.cursor);
          hasMore = res.has_more;
          body.cursor = res.cursor;

          for(let info of res.data){
            // 背景图：base_info.cover_img
        // 课程号：base_info.booklet_id
        // 标题：base_info.title
        // 描述：base_info.summary
        // 数量：base_info.buy_count
        // 打折：event_discount.discount_rate
        // 原价：base_info.price
        // 上架时间：base_info.put_on_time
        // 返现红包：原价*20%
        const course = {
            cover_img: info.base_info.cover_img,
            booklet_id: info.base_info.booklet_id,
            title: info.base_info.title,
            summary: info.base_info.summary,
            buy_count: info.base_info.buy_count,
            price: info.base_info.price,
            put_on_time: info.base_info.put_on_time,
          };
          if (info.event_discount && info.event_discount.discount_rate) {
            course.discount_rate = info.event_discount.discount_rate;
          } else {
            course.discount_rate = 10; // 没有打折就是 10
          }
          courseList.push(course);

          }

          await sleep(3000);
    }catch(error){
        console.error(error);
    }}
    try{


    console.log("课程数:", courseList.length);
    const courseListData = courseList.map((item) => [
      item.cover_img,
      item.booklet_id,
      item.title,
      item.summary,
      item.buy_count,
      item.price,
      item.put_on_time,
      item.discount_rate,
    ]);
    console.log("开始写入文件:");
    const excel = [
      {
        name: "sheet1",
        data: courseListData,
      },
    ];
    const buffer = xlsx.build(excel);

    // 写入文件
    fs.writeFile("course.xlsx", buffer, function (err) {
      if (err) {
        console.log("Write failed: " + err);
        return;
      }

      console.log("Write completed.");
    });
  } catch (error) {
    console.error(error);
  }
}
fetchData();