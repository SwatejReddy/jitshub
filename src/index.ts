import { Hono } from 'hono'
import { authRouter } from './routes/auth.routes';
import { adminRouter } from './routes/admin.routes';
import { noticeRouter } from './routes/notice.routes';

const app = new Hono<{
  Bindings: {
    DATABASE_URL: string,
    SECRET_KEY: string
  }
  Variables: {
    userId: string
  }
}>();


const API = '/api/v1';

app.route(`${API}/auth`, authRouter);
app.route(`${API}/admin`, adminRouter);
app.route(`${API}/notice`, noticeRouter);

export default app
