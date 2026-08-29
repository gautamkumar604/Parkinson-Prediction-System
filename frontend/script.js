document.addEventListener("DOMContentLoaded", () => {

    const form = document.querySelector("#predictionForm");

    if (!form) {
        console.error("Prediction form not found!");
        return;
    }

    form.addEventListener("submit", async (event) => {

        // Page reload hone se rokna
        event.preventDefault();

        // Form ke saare input fields
        const inputs = form.querySelectorAll("input");

        const features = [];

        // Har input ki value collect karna
        for (const input of inputs) {

            const value = parseFloat(input.value);

            if (Number.isNaN(value)) {
                alert(`Please enter a valid value for ${input.name || "all fields"}.`);
                input.focus();
                return;
            }

            features.push(value);
        }

        // Parkinson dataset ke according 22 features hone chahiye
        if (features.length !== 22) {
            alert(
                `Expected 22 features, but found ${features.length} input fields.`
            );
            console.error("Features:", features);
            return;
        }

        // Loading show karo
        showLoading(true);

        try {

            // Flask backend ko request
            const response = await fetch("http://127.0.0.1:5000/predict", {

                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    features: features
                })
            });

            // Response JSON me convert
            const result = await response.json();

            // Agar backend error return kare
            if (!response.ok) {
                throw new Error(
                    result.error || "Prediction request failed."
                );
            }

            console.log("Prediction Response:", result);

            // Result screen par show karo
            showResult(result);

        } catch (error) {

            console.error("Prediction Error:", error);

            alert(
                "Unable to connect to the prediction server.\n\n" +
                "Make sure Flask backend is running on:\n" +
                "http://127.0.0.1:5000"
            );

        } finally {

            // Loading hide karo
            showLoading(false);
        }
    });
});


/* =========================================
   SHOW / HIDE LOADING
========================================= */

function showLoading(show) {

    const loading = document.querySelector(".loading");

    if (!loading) {
        return;
    }

    if (show) {
        loading.classList.remove("hidden");
    } else {
        loading.classList.add("hidden");
    }
}


/* =========================================
   SHOW PREDICTION RESULT
========================================= */

function showResult(result) {

    const resultCard = document.querySelector(".result-card");

    if (!resultCard) {
        console.error("Result card not found!");
        return;
    }

    // Result card visible karo
    resultCard.classList.remove("hidden");

    // Prediction
    const prediction = Number(result.prediction);

    // Probabilities
    const class0Probability =
        Number(result.class_0_probability) * 100;

    const class1Probability =
        Number(result.class_1_probability) * 100;


    // Prediction text
    let statusText;

    if (prediction === 1) {
        statusText = "Positive for Parkinson's";
    } else {
        statusText = "Negative for Parkinson's";
    }


    // Result heading
    const resultTitle =
        resultCard.querySelector("h2");

    if (resultTitle) {
        resultTitle.textContent = statusText;
    }


    // Probability boxes
    const probabilityBoxes =
        resultCard.querySelectorAll(".probability-box");

    if (probabilityBoxes.length >= 2) {

        const class0Value =
            probabilityBoxes[0].querySelector("strong");

        const class1Value =
            probabilityBoxes[1].querySelector("strong");


        if (class0Value) {
            class0Value.textContent =
                `${class0Probability.toFixed(2)}%`;
        }

        if (class1Value) {
            class1Value.textContent =
                `${class1Probability.toFixed(2)}%`;
        }
    }


    // Result ke paas scroll karo
    resultCard.scrollIntoView({
        behavior: "smooth",
        block: "center"
    });
}