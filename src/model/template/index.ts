import { NodeTemp } from "../Node";
import basic from "./basic";
import input from "./input";

interface Template {
    label: string; // 分类名称
    templates: NodeTemp[];
}

const template: Template[] = [
  {
    label: 'basic',
    templates: basic
  },
  {
    label: 'input',
    templates: input
  }
];

export default template;