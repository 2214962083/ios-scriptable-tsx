import * as JSX from '../lib/jsx-runtime'

declare global {
  const h: typeof JSX.h
  const Fragment: typeof JSX.Fragment
}
