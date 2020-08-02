import Simulator from './routes/Simulator'
import Printer from './routes/Printer'
import Landing from './routes/Landing'

export default [
  {
    path: '/',
    component: Landing
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