import { useState } from 'react';
import styles from './App.module.css';
import poweredImg from './assets/images/powered.png';
import leftArrowImg from './assets/images/leftarrow.png';
import { Griditem } from './assets/components/GridItem';
import { levels, calculateImc, Level } from './assets/helpers/imc';

const App = () => {
  const [heightField, setHeightField] = useState<number>(0);
  const [weightField, setWeightField] = useState<number>(0);
  const [toShow, setToShow] = useState<Level | null>(null);

  const handleCalculate = () => {
    if (heightField && weightField) {
      setToShow(calculateImc(heightField, weightField));
    } else {
      alert('Digite todos os campos');
    }
  };
  const handleBackButton = () => {
    setToShow(null);
    setHeightField(0);
    setWeightField(0);

  };

  return (
    <div className={styles.main}>
      <header>
        <div className={styles.headerContainer}>
          <img src={poweredImg} alt="" width={150} />
        </div>
      </header>
      <div className={styles.container}>
        <div className={styles.leftSide}>
          <h1>Calcule o seu IMC</h1>
          <p>IMC é a sigla para Índice de Massa Corpórea, parametro adotado pela Organização Mundial da Saúde para calcular o peso ideal de cada pessoa.</p>
          <input type="number" placeholder='Digite a sua altura. Ex: 1.5 (em metros)' value={heightField > 0 ? heightField : ''} onChange={e => setHeightField(parseFloat(e.target.value))} disabled={toShow ? true : false} />
          <input type="number" placeholder='Digite o seu peso. Ex: 75.3 (em kg)' value={weightField > 0 ? weightField : ''} onChange={e => setWeightField(parseFloat(e.target.value))} disabled={toShow ? true : false} />
          <button onClick={handleCalculate} disabled={toShow ? true : false}>Calcular</button>
        </div>
        <div className={styles.rightSide}>
          {/* Quando não tiver toShow, ou seja, ele for null */}
          {!toShow &&
            <div className={styles.grid}>
              {levels.map((item, key) => (
                <Griditem key={key} item={item} />
              ))}
            </div>
          }
          {/* Quando tiver, ou seja, ja tiver sido calculado */}
          {toShow &&
            <div className={styles.rightBig}>
              <div className={styles.rightArrow} onClick={handleBackButton} >
                <img src={leftArrowImg} alt="" width={25} />
              </div>
              <Griditem item={toShow} />
            </div>
          }
        </div>
      </div>
    </div>
  );
}

export default App;