
import "./widget.scss";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import ForwardToInboxIcon from '@mui/icons-material/ForwardToInbox';


const Widget = ({ type }) => {
    let data;
    switch (type) {
      case "Utilisateur":
        data = {
          title: "Utilisateurs",
          counter:12,
          link: "Liste des Utilisateurs",
          icon: (
            <PersonOutlinedIcon
              className="icon"
              style={{
                color: "crimson",
                backgroundColor: "rgba(255, 0, 0, 0.2)",
              }}
            />
          ),
        };
        break;
      case "Demandes d'absence":
        data = {
          title: "Demandes d'absence",
          counter:12,
          link: "Liste des demandes",
          icon: (
            <ForwardToInboxIcon
              className="icon"
              style={{
                backgroundColor: "rgba(218, 165, 32, 0.2)",
                color: "goldenrod",
              }}
            />
          ),
        };
        break;
        default:
            break;
        }
  return (
    <div className="widget">
      <div className="left">
        <span className="title">{data.title}</span>
        <span className="counter">
          {data.counter}
        </span>
        <span className="link">{data.link}</span>
      </div>
      <div className="right">
        {data.icon}
      </div>
    </div>
  );
};

export default Widget;