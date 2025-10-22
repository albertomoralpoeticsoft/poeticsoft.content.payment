const { 
  registerBlockType 
} = wp.blocks
const { 
  useBlockProps 
} = wp.blockEditor
const { 
  Panel,
  PanelBody,
  PanelRow
} = wp.components

import metadata from 'blocks/insert/block.json'
import './editor.scss';

const Edit = props => {

  const blockProps = useBlockProps({
    className: 'alignwide'
  })

  return <div 
    { 
      ...blockProps
    }
  >
    <Panel>
      <PanelBody>
        <PanelRow>
          BASE
        </PanelRow>
      </PanelBody>
    </Panel>
  </div>
}

const Save = () => null

registerBlockType(
  metadata.name,
  {
    edit: Edit,
    save: Save
  }
)