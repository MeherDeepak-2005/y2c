import nodemailer from 'nodemailer';


const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    type: "OAuth2",
    user: "y2cproject.hyd@gmail.com",
    clientId: "188782281394-18047vlj18ehptj35qiug5u0lfpdi1vo.apps.googleusercontent.com",
    clientSecret: "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",
    refreshToken: "1//04rjqqz6c0b9VCgYIARAAGAQSNwF-L9IrtUDj0ef-6u9GHgi0el9v8loxu5MpTOLEdeX5rpgVeQ-XxEWcH2CULi8w2JKcF7uxDjc",
    accessToken: "ya29.A0ARrdaM8aX089C2YFrQiJ3HiKfpWIuNfAfSVwk7rMSJkVKvBeAS3zd85ytsjowtafSubjVvMUR81mmhcTpEb0N520M4vT9hw2ad8H4DIDRA9TkPghcIE5t9GDfqYsjmGtGFxT2ra9J7Q_mgw7eHOA0HqSArWr"
  }
});





export default function ContactMailSender(req, res) {

  if (req.method === "POST") {
    console.log(req.body);
    const { subject, body, downloadUrl, fileName, mailingList } = req.body;


    try {
      transporter.sendMail({
        from: "Project Y2C",
        to: mailingList,
        subject: subject,
        text: body,
        attachments: [{
          filename: fileName,
          path: downloadUrl
        }]
      })
      res.status(201).json({
        message: "Email sent"
      })
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: "Something went wrong"
      })
    }


  } else {
    res.status(400).json({
      message: "Hey!! Seems like you lost your way."
    });
  }
}
