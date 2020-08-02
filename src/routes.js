import Simulator from './routes/Simulator'
import Printer from './routes/Printer'
import Uploader from './routes/Uploader'

export default [
  {
    path: '/',
    component: Uploader
  },
  {
    path: '/simulator',
    component: Simulator
  },
  {
    path: '/printer',
    component: Printer
  }
]