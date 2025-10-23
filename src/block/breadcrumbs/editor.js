const { 
  registerBlockType 
} = wp.blocks
const { 
  useBlockProps 
} = wp.blockEditor

import metadata from 'blocks/breadcrumbs/block.json'
import './editor.scss';

const Edit = props => {

  const blockProps = useBlockProps()
   
  return <div  
    { 
      ...blockProps
    }
  >
    BREADCRUMBS
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