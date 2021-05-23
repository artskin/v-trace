// declare module '*.vue' {
//   import { DefineComponent } from 'vue'
//   const component: DefineComponent<{}, {}, any>
//   export default component
// }
interface ILocus{
    id:number,
    name:string,
    points:Array<number>
  }
  interface IMap{
    name:string,
    url:string,
    locusList:Array<ILocus>
  }