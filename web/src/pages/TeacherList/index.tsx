import React, { useState, useEffect, FormEvent } from "react";

import PageHeader from "../../components/PageHeader";
import TeacherItem, { Teacher } from "../../components/TeacherItem";
import Input from "../../components/Input";
import Select from "../../components/Select";

import "./styles.css";
import api from "../../services/api";

function TeacherList() {
    const [teachers, setTeachers] = useState([]);
    const [subject, setSubject] = useState("");
    const [week_day, setWeekDay] = useState("");
    const [time, setTime] = useState("");

    useEffect(() => {
        api.get("classes", {
            params: {
                list_all: true
            }
        }).then((response) => {
            setTeachers(response.data);
        });
    }, []);

    async function searchTeachers(e: FormEvent) {
        e.preventDefault();

        try {
            const response = await api.get("classes", {
                params: {
                    subject,
                    week_day,
                    time
                }
            });

            setTeachers(response.data);
        } catch (err) {
            alert("Falha ao consultar api");
        }
    }

    return (
        <div id="page-teacher-list" className="container">
            <PageHeader title="Estes são seus clientes">
                <form id="search-teachers" onSubmit={searchTeachers}>
                    <Select
                        name="subject"
                        label="Serviço"
                        value={subject}
                        onChange={(e) => {
                            setSubject(e.target.value);
                        }}
                        options={[
                            { value: "Corte", label: "Corte" },
                            { value: "Escova", label: "Escova" },
                            { value: "Coloração", label: "Coloração" },
                            {
                                value: "Sobrnacelhas",
                                label: "Sobrnacelhas"
                            },
                            { value: "Maquiagem", label: "Maquiagem" },
                            { value: "Penteado", label: "Penteado" },
                            { value: "Selagem", label: "Selagem" },
                            { value: "Progressiva", label: "Progressiva" }
                        ]}
                    />
                    <Select
                        name="week-day"
                        label="Dia da semana"
                        value={week_day}
                        onChange={(e) => {
                            setWeekDay(e.target.value);
                        }}
                        options={[
                            { value: "0", label: "Domingo" },
                            { value: "1", label: "Segunda-feira" },
                            { value: "2", label: "Terça-feira" },
                            { value: "3", label: "Quarta-feira" },
                            { value: "4", label: "Quinta-feira" },
                            { value: "5", label: "Sexta-feira" },
                            { value: "6", label: "Sábado" }
                        ]}
                    />
                    <Input
                        name="time"
                        label="Hora"
                        type="time"
                        value={time}
                        onChange={(e) => {
                            setTime(e.target.value);
                        }}
                    />

                    <button type="submit">Buscar</button>
                </form>
            </PageHeader>
            <main>
                {teachers.map((teacher: Teacher) => {
                    return <TeacherItem key={teacher.id} teacher={teacher} />;
                })}
            </main>
        </div>
    );
}

export default TeacherList;
