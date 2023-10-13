"use client"
import { useState } from 'react';
import styles from '@/styles/liftSelection.module.css'; // Updated import path

export default function LiftSelection() {
 const [selectedMuscles, setSelectedMuscles] = useState([]);
    const handleMuscleSelection = (muscle) => {
        if (selectedMuscles.includes(muscle)) {
            setSelectedMuscles(selectedMuscles.filter((m) => m !== muscle));
        } else {
            setSelectedMuscles([...selectedMuscles, muscle]);
        }
    };
    return (
        <div className={styles.container}>
            <div className={styles.center}>
                {/* export^^^^^^ into a component for metadata */}
                <h1  className={styles.title}>Select the muscle groups you are working out today!</h1>
                <div className={styles.buttonContainer}>
                    <button className={styles.button} onClick={() => handleMuscleSelection('Chest')}>
                        Chest
                    </button>
                    <button className={styles.button} onClick={() => handleMuscleSelection('Back')}>
                        Back
                    </button>
                    <button className={styles.button} onClick={() => handleMuscleSelection('Abs')}>
                        Abs
                    </button>
                    <button className={styles.button} onClick={() => handleMuscleSelection('Quads')}>
                        Quads
                    </button>
                    <button className={styles.button} onClick={() => handleMuscleSelection('Hamstrings')}>
                        Hamstrings
                    </button>
                    <button className={styles.button} onClick={() => handleMuscleSelection('Biceps')}>
                        Biceps
                    </button>
                    <button className={styles.button} onClick={() => handleMuscleSelection('Triceps')}>
                        Triceps
                    </button>
                    <button className={styles.button} onClick={() => handleMuscleSelection('Shoulders')}>
                        Shoulders
                    </button>
                    <button className={styles.button} onClick={() => handleMuscleSelection('Calves')}>
                        Calves
                    </button>
                </div>
                <p className={styles.selectedMuscles}>
                    Selected muscles: {selectedMuscles.join(', ')}
                </p>
            </div>
        </div>
    )
}