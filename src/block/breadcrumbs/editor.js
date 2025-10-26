import { v4 as uuidv4 } from 'uuid'
const { 
  registerBlockType 
} = wp.blocks
const { 
  useBlockProps 
} = wp.blockEditor
const {
  useEffect
} = wp.element

import metadata from 'blocks/breadcrumbs/block.json'
import './editor.scss';

const Edit = props => {
  
  const {
    attributes,
    setAttributes 
  } = props  
  const { 
    blockId
  } = attributes;

  const blockProps = useBlockProps()
  
  useEffect(() => {

    if (!blockId) {

      setAttributes({ blockId: uuidv4() })
    }

  }, [])
   
  return <div { ...blockProps } >
    BREADCRUMBS - { blockId }
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