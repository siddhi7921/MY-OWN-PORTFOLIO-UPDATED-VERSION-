import unittest

from prototype import DISCLOSURE, analyze_news, clean_text, validate_text


class PrototypeTests(unittest.TestCase):
    def test_original_preprocessing(self):
        self.assertEqual(clean_text("NEWS! https://example.com 123  Policy"), "news policy")

    def test_rejects_short_empty_unsupported_and_large_inputs(self):
        for text in (None, "", "short", "!" * 30, "a" * 5001):
            with self.subTest(text_type=type(text).__name__):
                with self.assertRaises(ValueError):
                    validate_text(text)

    def test_examples_remain_readable(self):
        for text in (
            "Government announces a new digital education policy.",
            "सरकार ने नई शिक्षा नीति की घोषणा की।",
            "সরকার নতুন শিক্ষানীতি ঘোষণা করেছে।",
        ):
            self.assertTrue(validate_text(text))

    def test_output_always_discloses_untrained_head(self):
        result = analyze_news("Government announces a new education policy.", lambda text: [0.25, 0.75])
        self.assertIn(DISCLOSURE, result)
        self.assertIn("Class 0 activation: 25.0%", result)
        self.assertIn("not", result)
        self.assertNotIn("likely REAL", result)
        self.assertNotIn("likely FAKE", result)

    def test_validation_does_not_load_model(self):
        def fail_if_called(text):
            self.fail("Invalid input must not load the model")

        self.assertIn("at least 15", analyze_news("short", fail_if_called))

    def test_model_failures_do_not_leak_details(self):
        def unavailable(text):
            raise RuntimeError("private diagnostic")

        result = analyze_news("Government announces a new education policy.", unavailable)
        self.assertIn(DISCLOSURE, result)
        self.assertIn("temporarily unavailable", result)
        self.assertNotIn("private diagnostic", result)

    def test_rejects_invalid_activations(self):
        for scores in ([float("nan"), 0.5], [-1, 2], [0.2], [0.5, 0.7]):
            with self.subTest(scores=scores):
                result = analyze_news("Government announces a new education policy.", lambda text: scores)
                self.assertIn("temporarily unavailable", result)


if __name__ == "__main__":
    unittest.main()
