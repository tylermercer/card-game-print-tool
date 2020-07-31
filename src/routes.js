import Simulator from './routes/Simulator'
import Printer from './routes/Printer'

export default [
  {
    path: '/',
    component: Simulator
  },
  {
    path: '/printer',
    component: Printer
  }
]