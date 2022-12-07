import React from 'react';
import style from './ClassComponent.module.css';
import PropTypes from 'prop-types';

export class ClassComponent extends React.Component {
  state = {
    result: 'Результат',
    userNumber: '',
    randomNumber:
      Math.floor(Math.random() * this.props.max - this.props.min) +
      this.props.min,
    count: 0,
    isWork: true,
  };


  handleSubmit = (e) => {
    e.preventDefault();
    this.setState(state => ({
      count: this.state.count + 1,
    }));

    this.setState((state) => {
      if (!state.userNumber) return state;

      if (state.userNumber > state.randomNumber) {
        return {
          result: `${state.userNumber} больше загоданного`,
          userNumber: '',
        };
      }

      if (state.userNumber < state.randomNumber) {
        return {
          result: `${state.userNumber} меньше загоданного`,
          userNumber: '',
        };
      }

      return {
        result: `Угадали число ${state.randomNumber},
        попыток ${state.count}`,
        userNumber: '',
        isWork: false,
      };
      
    });
  };

  handleChange = (e) => {
    this.setState({
      userNumber: e.target.value,
    });
  };

  render() {
    const isWork = this.state.isWork;
    return (
      <div className={style.game}>
        <p className={style.result}>{this.state.result}</p>

        <form
          className={style.form}
          onSubmit={this.handleSubmit}>

          <label className={style.label} htmlFor='user_number'>
            Угадай число
          </label>

          <input className={style.input}
            type='number' id='user_number'
            onChange={this.handleChange}
            value={this.state.userNumber} />
          <button className={style.btn}>
            {isWork ? 'Угадать' : 'Сыграть ещё'}
          </button>
        </form>
      </div>
    );
  }
}

ClassComponent.PropTypes = {
  min: PropTypes.number,
  max: PropTypes.number,
};
