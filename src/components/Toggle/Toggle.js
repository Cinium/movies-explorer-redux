import { connect } from 'react-redux';
import './Toggle.css';
import { changeToggleState } from '../../redux/actions';

function Toggle({ label, toggle, changeToggleState }) {
    function handleToggle() {
        changeToggleState(!toggle);
        localStorage.setItem('toggleState', JSON.stringify(!toggle));
    }

    return (
        <div className="toggle">
            <label className="toggle__label" onClick={handleToggle}>
                {label}
            </label>

            <div
                className={`toggle__container ${
                    toggle ? '' : 'toggle__container_disabled'
                }`}
                onClick={handleToggle}
            >
                <div
                    className={`toggle__dot ${
                        toggle ? '' : 'toggle__dot_disabled'
                    }`}
                />
            </div>
        </div>
    );
}

const mapStateToProps = state => ({
    toggle: state.app.toggle,
});

const mapDispatchToProps = {
    changeToggleState,
};

export default connect(mapStateToProps, mapDispatchToProps)(Toggle);
