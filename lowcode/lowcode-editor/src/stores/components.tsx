// 编辑区域的数据由store管理
import { create} from "zustand"
// parentId + children 可以构建出一个树结构
export interface Component{
    id:number;
    name:string;
    children?:Component[];
    parentId?:number;
}

interface State {
    components:Component[];
}
// store 主要提供 State & Actions 

interface Actions {
    
}