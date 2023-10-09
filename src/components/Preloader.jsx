import img from '../assets/calendar.svg'

export default function Preloader(){
	return (
		// <div className="lds-ripple"><div></div><div></div></div>
		<div className="container">
  <div className="coast">
    <div className="wave-rel-wrap">
      <div className="wave"></div>
    </div>
  </div>
  <div className="coast delay">
    <div className="wave-rel-wrap">
      <div className="wave delay"></div>
    </div>
  </div>
  <div className="text text-w">N</div>
  <div className="text text-a">a</div>
  <div className="text text-v">t</div>
  <div className="text text-e">a</div>
 <div className="text text-u">s</div> 
 <div className="text text-love">h</div> 
 <div class="text text-j">a</div> 
 <div class="text text-ja"><img src={img} width="100rem"/></div> 
</div>
	)
}