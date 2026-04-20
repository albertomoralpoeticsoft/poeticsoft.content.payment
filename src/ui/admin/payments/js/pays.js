const {
  __experimentalInputControl: InputControl,
  Button
} = wp.components
import { 
  apifetch
} from 'uiutils/api'
import EditMail from './pays-editmail'
import EditPostid from './pays-editpostid'

export default props => { 
    
  return <div className="Pays">
    {
      Object.keys(props.state.groupedPays).length ?
      Object.keys(props.state.groupedPays)
      .map(
        key => <div className="Pay">
          <div className="Email">
            { key }
          </div>
          <div className="Posts">
            {
              props.state.groupedPays[key]
              .map(
                access => <div className="Access">
                  <span className="PostId">
                    [
                      <strong>
                        { access.post_id }
                      </strong>
                    ]
                  </span>
                  { ' ' }
                  <span className="PageTitle">
                    <strong>
                      { 
                        props.state.campuspagesbyid[access.post_id] ? 
                        props.state.campuspagesbyid[access.post_id].title
                        :
                        'No Post'
                      }
                    </strong>
                  </span>
                </div>
              )
            }
          </div>
        </div>
      )
      :
      <div className="Loading">
        Cargando datos...
      </div>
    }
  </div>
}