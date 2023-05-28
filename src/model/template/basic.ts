import { NodeTemp, NodeBase, SelectInput, TextInput, Type } from "../Node"

const basic: NodeTemp[] = [
  {
    label: 'Text',
    content: 'text',
    width: 256, height: 32,
    element: 'div',
    children: [],
    params: [
      {
        label: 'content',
        value: 'text',
        type: <TextInput>{
          type: Type.text,
          length: 32
        },
        handle: (target: NodeBase, value: string) => {
          target.content = value;
        }
      },
      {
        label: 'color',
        value: 'none',
        type: <SelectInput>{
          type: Type.select,
          options: [
            {
              label: 'none',
              value: 'none'
            },
            {
              label: 'blue',
              value: 'blue'
            }
          ]
        },
        handle: (target: NodeBase, value: string) => {
          if (value == 'none') {
            target.styles.set('background-color', '');
          } else if (value == 'blue') {
            target.styles.set('background-color', 'blue');
          }
        }
      }
    ],
    styles: new Map()
  },
  // { label: 'Button', width: 128, height: 44, element: 'button', html: 'button', styles: [] },
];

export default basic;