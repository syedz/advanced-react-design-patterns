import React, { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import styled from "styled-components";
import { postQuote, resetQuotes } from "../api/quote-api";
import type { Quote } from "../types/quotes";

const UpdateQuotes: React.FC = () => {
  const queryClient = useQueryClient();
  const [form, setForm] = useState<Quote>({ id: "", author: "", quote: "" });

  const createQuoteMutation = useMutation({
    mutationFn: (newQuote: Quote) => postQuote(newQuote),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["top-quotes"] });
      setForm({ id: "", author: "", quote: "" });
      toast.success("Hooray! Quote created.");
    },
    onError: (error) => {
      toast.error("Oh no! Quote creation failed.");
    },
  });

  const resetQuotesMutation = useMutation({
    mutationFn: () => resetQuotes(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["top-quotes"] });
      toast.info("Quotes reset to original list.");
    },
  });

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.author || !form.quote) {
      alert("Please fill in both fields.");
      return;
    }
    await createQuoteMutation.mutate(form, {
      onSuccess: () => {
        setForm({ id: "", author: "", quote: "" });
        queryClient.invalidateQueries({ queryKey: ["top-quotes"] });
        toast.success("Hooray! Quote created.");
      },
    });
  };

  return (
    <Container>
      <Title>Create Quote</Title>
      <Form onSubmit={onSubmit}>
        <FormGroup>
          <Label>Author</Label>
          <Input name="author" value={form.author} onChange={onChange} />
        </FormGroup>
        <FormGroup>
          <Label>Quote</Label>
          <Input name="quote" value={form.quote} onChange={onChange} />
        </FormGroup>
        <ButtonGroup>
          <SubmitButton type="submit" disabled={createQuoteMutation.isPending}>
            {createQuoteMutation.isPending ? "Creating..." : "Create Quote"}
          </SubmitButton>
          <ResetButton 
            type="button" 
            onClick={() => resetQuotesMutation.mutate()}
            disabled={resetQuotesMutation.isPending}
          >
            {resetQuotesMutation.isPending ? "Resetting..." : "Reset Quotes"}
          </ResetButton>
        </ButtonGroup>
      </Form>
    </Container>
  );
};

export default UpdateQuotes;

// Styles
const Container = styled.div`max-width: 800px; margin: 20px auto; padding: 1rem; border: 1px solid #eee;`;
const Title = styled.h2`margin-bottom: 1rem;`;
const Form = styled.form`display: flex; flex-direction: column; gap: 1rem;`;
const FormGroup = styled.div`display: flex; flex-direction: column; gap: 0.5rem;`;
const Label = styled.label`font-weight: bold;`;
const Input = styled.input`padding: 0.5rem; border: 1px solid #ccc; border-radius: 4px;`;
const ButtonGroup = styled.div`display: flex; gap: 1rem;`;
const SubmitButton = styled.button`background: #4299e1; color: white; padding: 0.75rem; border: none; cursor: pointer;`;
const ResetButton = styled.button`background: #edf2f7; color: #4a5568; padding: 0.75rem; border: none; cursor: pointer;`;