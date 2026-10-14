begin;

update public.questions set explanation = $x$In y = mx + c, c is the y-intercept, so c = 5 and the line crosses the y-axis at (0, 5). The −2 is the gradient m, not the intercept, which is why option −2 is wrong.$x$
where id = '3746c060-2553-47a7-b97d-6aa313de7ca4' and length(trim(coalesce(explanation,''))) < 40;

update public.questions set explanation = $x$Compare y = 3x − 7 with y = mx + c. The coefficient of x is the gradient, so m = 3. The −7 is the y-intercept, so it is not the gradient.$x$
where id = '452fea1c-d499-4898-ba4e-df15cb7a99c8' and length(trim(coalesce(explanation,''))) < 40;

update public.questions set explanation = $x$There are 4 + 6 = 10 marbles in total and 4 of them are red, so P(red) = 4/10. Dividing top and bottom by 2 gives 2/5. Using 6 as the total (4/6) ignores the blue marbles.$x$
where id = '37e43389-72d3-405c-9414-6744f63c120f' and length(trim(coalesce(explanation,''))) < 40;

update public.questions set explanation = $x$Probabilities of complementary events add to 1, so P(A) = 1 − P(not A) = 1 − 0.35 = 0.65. The given 0.35 is P(not A), not P(A), so it cannot be the answer.$x$
where id = 'ce38fc4f-907a-42ce-ae91-fe411ee3478e' and length(trim(coalesce(explanation,''))) < 40;

commit;
