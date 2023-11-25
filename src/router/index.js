import { createRouter, createWebHistory } from 'vue-router'
import SignatureSchemeView from '../views/SignatureSchemeView.vue'
import MultiSignatureSchemeView from '../views/MultiSignatureSchemeView.vue'

const routes = [
  {
    path: '/',
    redirect: { name: 'signatureScheme' }
  },
  {
    path: '/academy-bls-aggregation-demo/',
    name: 'signatureScheme',
    component: SignatureSchemeView
  },
  {
    path: '/academy-bls-aggregation-demo/multi',
    name: 'multiSignatureScheme',
    component: MultiSignatureSchemeView,
  },
  {
    path: '/generate',
    name: 'generate',
    component: () => import(/* webpackChunkName: "generate" */ '../views/GenerateView.vue')
  },
  {
    path: '/sign',
    name: 'sign',
    component: () => import(/* webpackChunkName: "sign" */ '../views/SignView.vue')
  },
  {
    path: '/aggregate-keys',
    name: 'aggregate-keys',
    component: () => import(/* webpackChunkName: "aggregate-keys" */ '../views/AggregateKeyView.vue')
  },
  {
    path: '/aggregate-sigs',
    name: 'aggregate-sigs',
    component: () => import(/* webpackChunkName: "aggregate-sigs" */ '../views/AggregateSigView.vue')
  },

  {
    path: '/verify',
    name: 'verify',
    component: () => import(/* webpackChunkName: "verify" */ '../views/VerifyView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
