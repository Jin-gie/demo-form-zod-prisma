"use client"
import styles from "./page.module.css";
import { schema } from "@/type";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";

export default function Home() {

  const router = useRouter();

  type UserFormData = {
    name: String,
    age: Number,
  }

  const {
    register,
    handleSubmit,
    formState: {errors}
  } = useForm<UserFormData>({
    resolver: zodResolver(schema)
  });
  

  const postResquest = async (data : UserFormData) => {
    const response = await fetch('/api/user', {
      method: "POST",
      headers: {'Content-Type' : 'application/json'},
      body: JSON.stringify({
        name: data.name,
        age: data.age
      })
    })

    if (response.ok) {
      router.push("/dashboard");
    } else {
      console.log("Registration failed")
    }
  }

  return (
    <main className={styles.main}>
      <div className={styles.formContainer}>
        <h1 className={styles.title}>Register form</h1>
        <form onSubmit={handleSubmit(postResquest)} className={styles.form}>
          <div className={styles.formContent}>
            <div className={styles.formEl}>
              <label htmlFor="name">Nom</label>
              <input {...register('name')} required />
              {errors.name?.message && <span className={styles.errorMsg}>{errors.name.message}</span>}
            </div>
            <div className={styles.formEl}>
              <label htmlFor="age">Age</label>
              <input type="number" {...register('age', { valueAsNumber: true })} required />
              {errors.age?.message && <span className={styles.errorMsg}>{errors.age?.message}</span>}
            </div>
          </div>
          <input type="submit" className={styles.submitBtn} />
        </form>
      </div>
    </main>
  );
}
