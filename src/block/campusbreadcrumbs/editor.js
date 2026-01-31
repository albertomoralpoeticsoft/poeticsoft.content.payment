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

import metadata from 'blocks/campusbreadcrumbs/block.json'
import './editor.scss';

const Edit = props => {
  
  const {
    clientId,
    attributes,
    setAttributes 
  } = props  
  const { 
    blockId,
    refClientId
  } = attributes;

  const blockProps = useBlockProps()
  
  useEffect(() => {

    if (!blockId) {

      setAttributes({ 
        blockId: uuidv4(),
        refClientId: clientId
      })

    } else {

      if (refClientId !== clientId) {

        setAttributes({ 
          blockId: uuidv4(),
          refClientId: clientId
        })
      }
    }

  }, [])
   
  return <div { ...blockProps } >
    CAMPUS BREADCRUMBS
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