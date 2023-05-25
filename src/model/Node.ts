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

// 组件属性
export interface ParamItem {

}

// 组件样式
export interface StyleItem {
    key: string;
    value: string;
}

export interface NodeBase extends Rect {
    element: string; // 标签类型
    html: string; // 复杂组件实现
    styles: StyleItem[];
}

export interface NodeTemp extends NodeBase {
    label: string;
}

export interface Node extends NodeBase, Position {
    id: string;
}

export interface TextNode extends Node {
    content: string;
}

export interface ButtonNode extends TextNode {
    radius: number;
}