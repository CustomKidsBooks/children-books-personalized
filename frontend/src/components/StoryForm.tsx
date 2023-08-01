// Form.tsx

// ... (other code)

const Form: React.FC<FormProps> = ({ handleSubmit }) => {
  const [values, setValues] = React.useState({
    subject: "",
    character: "boy",
    message: "",
    description: "",
    ageGroup: 0,
    specialNeeds: "",
    language: "English",
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleBlur = (event: React.FocusEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    // Perform validation or other actions on blur if needed
  };

  // ... (other code)

  return (
    <form onSubmit={formikSubmit} className="mt-10 w-full max-w-2xl flex-col gap-7">
      {/* Use the ReusableInput component for various input fields */}
      <ReusableInput
        label="Subject of a story"
        name="subject"
        type="textarea"
        value={values.subject}
        onChange={handleChange}
        onBlur={handleBlur}
        placeholder="Ex. A young girl named Sara loves exploring the world and she faces challenges along the way."
        rows={5}
      />

      <ReusableInput
        label="Choose the character"
        name="character"
        type="select"
        value={values.character}
        onChange={handleChange}
        onBlur={handleBlur}
        options={characterList}
      />

      <ReusableInput
        label="Message to convey"
        name="message"
        type="text"
        value={values.message}
        onChange={handleChange}
        onBlur={handleBlur}
        placeholder="Importance of playing alone and free"
      />

      {/* Other form fields go here */}
      {/* ... */}
      <Button
        type="submit"
        intent="gradiant"
        size="large"
        className="text-white"
      >
        Create &#10024;
      </Button>
    </form>
  );
};

export default Form;
