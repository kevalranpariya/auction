import { config } from 'dotenv';
import { createTransport } from 'nodemailer';
config();

const { EMAIL_PASS, EMAIL } = process.env;
const mailTransport = createTransport({
  service: 'Gmail',
  auth: {
    user: EMAIL,
    pass: EMAIL_PASS
  }
});
export default mailTransport;