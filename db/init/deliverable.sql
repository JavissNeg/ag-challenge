DROP DATABASE IF EXISTS ag_db;
CREATE DATABASE ag_db;

USE ag_db;

/* =========================================================
   1. DDL
========================================================= */

CREATE TABLE companies (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(150) NOT NULL UNIQUE,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE programs (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(150) NOT NULL UNIQUE,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE statuses (
    id TINYINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    code VARCHAR(30) NOT NULL UNIQUE,
    name VARCHAR(100) NOT NULL,
    description VARCHAR(255)
);

CREATE TABLE students (
    id BIGINT UNSIGNED PRIMARY KEY,
    first_name VARCHAR(80) NOT NULL,
    last_name VARCHAR(120) NOT NULL,
    company_id BIGINT UNSIGNED NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,

    CONSTRAINT fk_students_company
        FOREIGN KEY (company_id)
        REFERENCES companies(id)
);

CREATE TABLE enrollments (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    student_id BIGINT UNSIGNED NOT NULL,
    program_id BIGINT UNSIGNED NOT NULL,
    status_id TINYINT UNSIGNED NOT NULL,
    enrollment_date DATE NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,

    CONSTRAINT uq_student_program
        UNIQUE (student_id, program_id),

    CONSTRAINT fk_enrollment_student
        FOREIGN KEY (student_id)
        REFERENCES students(id),

    CONSTRAINT fk_enrollment_program
        FOREIGN KEY (program_id)
        REFERENCES programs(id),

    CONSTRAINT fk_enrollment_status
        FOREIGN KEY (status_id)
        REFERENCES statuses(id)
);

CREATE TABLE status_history (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    enrollment_id BIGINT UNSIGNED NOT NULL,
    previous_status_id TINYINT UNSIGNED,
    new_status_id TINYINT UNSIGNED NOT NULL,
    changed_at DATETIME NOT NULL,
    reason VARCHAR(255) NOT NULL,

    CONSTRAINT fk_history_enrollment
        FOREIGN KEY (enrollment_id)
        REFERENCES enrollments(id),

    CONSTRAINT fk_history_previous_status
        FOREIGN KEY (previous_status_id)
        REFERENCES statuses(id),

    CONSTRAINT fk_history_new_status
        FOREIGN KEY (new_status_id)
        REFERENCES statuses(id)
);

CREATE INDEX idx_students_company
    ON students(company_id);

CREATE INDEX idx_enrollments_student
    ON enrollments(student_id);

CREATE INDEX idx_enrollments_program
    ON enrollments(program_id);

CREATE INDEX idx_enrollments_status
    ON enrollments(status_id);

CREATE INDEX idx_status_history_enrollment
    ON status_history(enrollment_id);

CREATE INDEX idx_status_history_changed_at
    ON status_history(changed_at);


/* =========================================================
   2. DML - INSERCIÓN DE DATOS
========================================================= */

INSERT INTO statuses (code, name, description) VALUES
('ENROLLED', 'Inscrito', 'Student enrollment has been registered.'),
('ACTIVE', 'Activo', 'Student is currently active.'),
('SUSPENDED', 'Suspendido', 'Student is temporarily suspended.'),
('COMPANY_LEAVE', 'Baja empresa', 'Student left due to company-related reasons.'),
('PROGRAM_LEAVE', 'Baja programa', 'Student voluntarily left the academic program.'),
('REENROLLED', 'Reingreso', 'Student returned after leaving the program.'),
('GRADUATED', 'Egresado', 'Student successfully completed the program.');

INSERT INTO companies (name) VALUES
('Alpura'),
('Bayer'),
('Coppel'),
('Soriana');

INSERT INTO programs (name) VALUES
('Lic. Administración'),
('Lic. Contaduría'),
('Lic. Logística'),
('Lic. Negocios'),
('Maestría en Dirección'),
('Maestría en Educación'),
('Secundaria Abierta');

INSERT INTO students (id, first_name, last_name, company_id) VALUES
(1001,'Luis','Cruz',4),
(1002,'Andrés','Ramírez',3),
(1003,'Daniela','Ortiz',4),
(1004,'Luis','Reyes',4),
(1005,'Sofía','Hernández',4),
(1006,'Paola','Mendoza',2),
(1007,'Gabriela','Cruz',4),
(1008,'Gabriela','Morales',4),
(1009,'Paola','López',4),
(1010,'Valeria','Torres',4),
(1011,'Paola','Sánchez',1),
(1012,'José','Gutiérrez',3),
(1013,'Diego','Jiménez',4),
(1014,'Daniela','Morales',4),
(1015,'Paola','Ramírez',4),
(1016,'Jorge','Rodríguez',3),
(1017,'Luis','Flores',4),
(1018,'Roberto','Hernández',4),
(1019,'Roberto','Morales',2),
(1020,'Carlos','Jiménez',4);

INSERT INTO enrollments
(
    student_id,
    program_id,
    status_id,
    enrollment_date
)
VALUES
(1001,4,2,'2025-02-26'),
(1002,2,3,'2022-10-04'),
(1003,3,7,'2017-10-02'),
(1004,3,7,'2015-06-06'),
(1005,3,5,'2017-03-31'),
(1006,7,5,'2023-03-28'),
(1007,4,4,'2024-03-30'),
(1008,4,4,'2018-07-05'),
(1009,3,7,'2017-06-01'),
(1010,3,7,'2020-11-04'),
(1011,1,4,'2017-10-14'),
(1012,2,3,'2022-05-06'),
(1013,4,4,'2020-02-26'),
(1014,3,7,'2024-10-29'),
(1015,3,7,'2015-07-01'),
(1016,6,3,'2022-12-05'),
(1017,3,5,'2017-12-29'),
(1018,4,5,'2022-03-28'),
(1019,5,5,'2016-09-14'),
(1020,3,7,'2015-03-31');

INSERT INTO status_history
(
    enrollment_id,
    previous_status_id,
    new_status_id,
    changed_at,
    reason
)
VALUES
-- Luis Cruz
(1, 1, 2, '2025-03-01 09:00:00', 'Proceso de onboarding completado'),

-- Andrés Ramírez
(2, 1, 2, '2022-10-10 08:30:00', 'Inicio de actividades académicas'),
(2, 2, 3, DATE_SUB(NOW(), INTERVAL 20 DAY), 'Documentación requerida pendiente'),

-- Daniela Ortiz
(3, 1, 2, '2017-10-09 09:00:00', 'Inicio de actividades académicas'),
(3, 2, 7, '2021-07-15 12:00:00', 'Programa completado con éxito'),

-- Luis Reyes
(4, 1, 2, '2015-06-15 08:00:00', 'Inicio de actividades académicas'),
(4, 2, 7, '2019-05-30 16:00:00', 'Programa completado con éxito'),

-- Sofía Hernández
(5, 1, 2, '2017-04-05 09:00:00', 'Inicio de actividades académicas'),
(5, 2, 5, '2018-02-20 11:30:00', 'Baja voluntaria del programa'),

-- Paola Mendoza
(6, 1, 2, '2023-04-03 09:00:00', 'Inicio de actividades académicas'),
(6, 2, 5, '2024-02-15 10:00:00', 'Motivos personales'),

-- Gabriela Cruz
(7, 1, 2, '2024-04-05 08:00:00', 'Inicio de actividades académicas'),
(7, 2, 4, '2025-02-10 15:30:00', 'Relación laboral finalizada'),
(7, 2, 2, '2025-02-10 15:30:00', 'El estudiante regresó tras resolver problemas de documentación'),

-- Gabriela Morales
(8, 1, 2, '2018-07-12 08:00:00', 'Inicio de actividades académicas'),
(8, 2, 4, '2020-01-18 09:15:00', 'Reestructuración de la empresa'),

-- Paola López
(9, 1, 2, '2017-06-10 08:00:00', 'Inicio de actividades académicas'),
(9, 2, 7, '2021-05-20 13:30:00', 'Programa completado con éxito'),

-- Valeria Torres
(10, 1, 2, '2020-11-10 08:00:00', 'Inicio de actividades académicas'),
(10, 2, 7, '2024-12-12 17:00:00', 'Programa completado con éxito'),

-- Paola Sánchez
(11, 1, 2, '2017-10-20 09:00:00', 'Inicio de actividades académicas'),
(11, 2, 4, '2019-03-12 10:30:00', 'La empresa ya no patrocina el programa'),

-- José Gutiérrez
(12, 1, 2, '2022-05-15 08:30:00', 'Inicio de actividades académicas'),
(12, 2, 3, '2025-05-28 09:00:00', 'Desempeño académico en revisión'),

-- Diego Jiménez
(13, 1, 2, '2020-03-05 08:00:00', 'Inicio de actividades académicas'),
(13, 2, 4, '2021-09-08 11:00:00', 'Contrato laboral finalizado'),

-- Daniela Morales
(14, 1, 2, '2024-11-05 08:00:00', 'Inicio de actividades académicas'),
(14, 2, 7, DATE_SUB(NOW(), INTERVAL 5 DAY), 'Programa completado con éxito'),

-- Paola Ramírez
(15, 1, 2, '2015-07-08 08:00:00', 'Inicio de actividades académicas'),
(15, 2, 7, '2019-06-28 16:00:00', 'Programa completado con éxito'),

-- Jorge Rodríguez
(16, 1, 2, '2022-12-12 08:00:00', 'Inicio de actividades académicas'),
(16, 2, 3, '2025-06-15 10:00:00', 'Regularización académica pendiente'),

-- Luis Flores
(17, 1, 2, '2018-01-05 09:00:00', 'Inicio de actividades académicas'),
(17, 2, 5, '2019-10-11 10:30:00', 'El estudiante solicitó su baja'),

-- Roberto Hernández
(18, 1, 2, '2022-04-04 08:30:00', 'Inicio de actividades académicas'),
(18, 2, 5, '2023-08-14 09:45:00', 'Baja asistencia académica'),

-- Roberto Morales
(19, 1, 2, '2016-09-21 08:00:00', 'Inicio de actividades académicas'),
(19, 2, 5, '2018-03-18 10:00:00', 'El estudiante decidió abandonar el programa'),

-- Carlos Jiménez
(20, 1, 2, '2015-04-08 08:00:00', 'Inicio de actividades académicas'),
(20, 2, 7, '2019-03-22 15:00:00', 'Programa completado con éxito');


/* =========================================================
   3. QUERIES DE ANÁLISIS
========================================================= */

-- ============================================================================
-- 1. Estudiantes activos agrupados por programa académico.
-- ============================================================================

SELECT
    p.name AS program,
    COUNT(*) AS active_students
FROM enrollments e
INNER JOIN programs p
    ON p.id = e.program_id
INNER JOIN statuses s
    ON s.id = e.status_id
WHERE s.code = 'ACTIVE'
GROUP BY p.id, p.name
ORDER BY active_students DESC;

-- ============================================================================
-- 2. Estudiantes con al menos un cambio de estado durante los últimos 30 días.
-- ============================================================================

SELECT DISTINCT
    st.id,
    CONCAT(st.first_name, ' ', st.last_name) AS student,
    p.name AS program,
    sh.changed_at
FROM status_history sh
INNER JOIN enrollments e
    ON e.id = sh.enrollment_id
INNER JOIN students st
    ON st.id = e.student_id
INNER JOIN programs p
    ON p.id = e.program_id
WHERE sh.changed_at >= DATE_SUB(NOW(), INTERVAL 30 DAY)
ORDER BY sh.changed_at DESC;    

-- ============================================================================
-- 3. Tasa de deserción por programa académico.
-- ============================================================================

SELECT
    p.name AS program,
    COUNT(*) AS total_students,
    SUM(
        CASE
            WHEN s.code IN ('COMPANY_LEAVE','PROGRAM_LEAVE')
            THEN 1
            ELSE 0
        END
    ) AS dropouts,
    ROUND(
        SUM(
            CASE
                WHEN s.code IN ('COMPANY_LEAVE','PROGRAM_LEAVE')
                THEN 1
                ELSE 0
            END
        ) * 100.0 / COUNT(*),
        2
    ) AS dropout_rate
FROM enrollments e
INNER JOIN programs p
    ON p.id = e.program_id
INNER JOIN statuses s
    ON s.id = e.status_id
GROUP BY p.id, p.name
ORDER BY dropout_rate DESC;

-- ============================================================================
-- 4. Historial completo de un estudiante específico.
-- ============================================================================

SELECT
    st.id,
    CONCAT(st.first_name,' ',st.last_name) AS student,
    c.name AS company,
    p.name AS program,
    ps.name AS previous_status,
    ns.name AS new_status,
    sh.reason,
    sh.changed_at
FROM students st
INNER JOIN companies c
    ON c.id = st.company_id
INNER JOIN enrollments e
    ON e.student_id = st.id
INNER JOIN programs p
    ON p.id = e.program_id
INNER JOIN status_history sh
    ON sh.enrollment_id = e.id
LEFT JOIN statuses ps
    ON ps.id = sh.previous_status_id
INNER JOIN statuses ns
    ON ns.id = sh.new_status_id
WHERE st.id = 1002
ORDER BY sh.changed_at;


-- ============================================================================
-- 5. Estudiantes que regresaron después de una baja por empresa.
-- ============================================================================

    SELECT DISTINCT
        st.id,
        CONCAT(st.first_name, ' ', st.last_name) AS student,
        p.name AS program
    FROM status_history leave_event
    INNER JOIN status_history return_event
        ON return_event.enrollment_id = leave_event.enrollment_id
    INNER JOIN enrollments e
        ON e.id = leave_event.enrollment_id
    INNER JOIN students st
        ON st.id = e.student_id
    INNER JOIN programs p
        ON p.id = e.program_id
    INNER JOIN statuses previous_status
        ON previous_status.id = leave_event.new_status_id
    INNER JOIN statuses new_status
        ON new_status.id = return_event.new_status_id
    WHERE previous_status.code = 'COMPANY_LEAVE'
    AND new_status.code = 'ACTIVE'
    AND return_event.changed_at > leave_event.changed_at;


/* =========================================================
   4. INDICADOR DE NEGOCIO
========================================================= */


-- ============================================================================
-- Tasa de retención de estudiantes (Porcentaje de estudiantes que permanecen activos o se gradúan)
-- ============================================================================

SELECT
    ROUND(
        SUM(
            CASE
                WHEN s.code IN ('ACTIVE', 'GRADUATED')
                THEN 1
                ELSE 0
            END
        ) * 100.0 / COUNT(*),
        2
    ) AS retention_rate_percentage
FROM enrollments e
INNER JOIN statuses s
    ON s.id = e.status_id;

/* =========================================================
   5. STORED PROCEDURE
========================================================= */

DROP PROCEDURE IF EXISTS sp_register_status_change;

DELIMITER $$

CREATE PROCEDURE sp_register_status_change
(
    IN p_enrollment_id BIGINT,
    IN p_new_status_code VARCHAR(30),
    IN p_reason VARCHAR(255)
)
BEGIN

    DECLARE v_old_status_id TINYINT;
    DECLARE v_new_status_id TINYINT;

    START TRANSACTION;

    SELECT status_id
    INTO v_old_status_id
    FROM enrollments
    WHERE id = p_enrollment_id;

    IF v_old_status_id IS NULL THEN
        ROLLBACK;
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Enrollment not found.';
    END IF;

    SELECT id
    INTO v_new_status_id
    FROM statuses
    WHERE code = p_new_status_code;

    IF v_new_status_id IS NULL THEN
        ROLLBACK;
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Status not found.';
    END IF;

    IF v_old_status_id = v_new_status_id THEN
        ROLLBACK;
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'The enrollment already has the requested status.';
    END IF;

    UPDATE enrollments
    SET status_id = v_new_status_id
    WHERE id = p_enrollment_id;

    INSERT INTO status_history
    (
        enrollment_id,
        previous_status_id,
        new_status_id,
        changed_at,
        reason
    )
    VALUES
    (
        p_enrollment_id,
        v_old_status_id,
        v_new_status_id,
        NOW(),
        p_reason
    );

    COMMIT;

END$$

DELIMITER ;

-- CALL sp_register_status_change(
--     7,
--     'ACTIVE',
--     'El estudiante regresó tras resolver problemas de documentación'
-- );