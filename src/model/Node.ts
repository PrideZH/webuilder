export interface Rect {
    width: number;
    height: number;
}

export interface Position {
    x: number;
    y: number;
}

export interface Box extends Rect, Position {
}

export enum Type {
    text, select
}
export interface InputType {
    type: Type;
}
export interface TextInput extends InputType {
    length: number;
}
export interface NumberInput extends InputType {
    min: number;
    max: number;
}
export interface SelectInput extends InputType {
    options: {
        label: string;
        value: string;
    }[];
}

// 组件属性
export interface ParamItem {
    label: string;
    type: InputType,
    value: string;
    // required: boolean;
    handle: (target: NodeBase, value: string) => void; // 属性值初始化或修改后触发，用于自定义修改组件样式
}

export interface NodeBase extends Rect {
    element: string; // 标签类型
    content?: string;
    children: NodeBase[];
    params: ParamItem[];
    styles: Map<string, string>; // 组件样式
}

export interface NodeTemp extends NodeBase {
    label: string;
}

export interface Node extends NodeBase, Position {
    id: string;
}