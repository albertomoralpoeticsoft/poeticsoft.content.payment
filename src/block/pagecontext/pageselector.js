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
    const label = `${prefix} ${page.title.rendered || '(Sin título)'}`

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
    treerootid
  } = attributes

  const options = useMemo(
    () => {

      if (!pagesList) return [{ 
        label: 'Cargando páginas...', 
        value: null
      }]

      return [
        { 
          label: 'Selecciona root', 
          value: null 
        },
        { 
          label: 'Site root', 
          value: 0 
        },
        ...buildHierarchy(pagesList),
      ]

    }, 
    [ pagesList ]
  )

  return (
    <SelectControl
      label="Seleccionar Página"
      value={ treerootid }
      options={ options }
      onChange={
        value => setAttributes({
          treerootid: parseInt(value)
        })
      }
    />
  )
}
