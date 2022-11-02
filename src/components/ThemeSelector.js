import {useTheme} from '../hooks/useTheme'
import './ThemeSelector.css'


const themeColors = ['#cccc18', '#e663c9', '#7acbe6']

function ThemeSelector() {

    const {changeColor} = useTheme()

    return ( 
        <div className='theme-selector'>
            <div className='theme-buttons'>
                {themeColors.map(color => (
                    <div
                    key={color}
                    onClick={() => changeColor(color)}
                    style={{background: color}}
                    />
                ))}
            </div>
        </div>
     );
}

export default ThemeSelector;