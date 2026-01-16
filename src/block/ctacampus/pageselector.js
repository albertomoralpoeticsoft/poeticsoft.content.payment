const {
  useMemo
} = wp.element
const {
  SelectControl 
} = wp.components
    
const buildHierarchy = (
  pagesList, 
  parent = 0, 
  level = 0
) => {

  const children = pagesList
  .filter(p => p.parent === parent)

  return children
  .flatMap(page => {

    const prefix = '—'.repeat(level)
    const label = `${prefix} ${ page.title || '(Sin título)'}`

    return [
      { label, value: page.id },
      ...buildHierarchy(pagesList, page.id, level + 1),
    ]
  })
}

export const PageSelector = ({
  attributes, 
  setAttributes,
  pagesList
}) => { 

  const {  
    targetId
  } = attributes

  const options = useMemo(
    () => {

      if (!pagesList) return [{ 
        label: 'Cargando páginas...', 
        value: null
      }]

      return [
        { 
          label: 'Selecciona target', 
          value: null 
        },
        ...buildHierarchy(pagesList),
      ]

    }, 
    [ pagesList ]
  )

  return (
    <SelectControl
      className="SelectorPage"
      label="Seleccionar Página"
      value={ targetId }
      options={ options }
      onChange={
        value => setAttributes({
          targetId: parseInt(value)
        })
      }
    />
  )
}
